import React, { Component } from "react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat/EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { connect } from "react-redux";
import { withGetScreen } from "react-getscreen";
import EventNotFound from "./EventNotFound";
import { objectToArray, createDataTree } from "../../../common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../../user/userActions";
import LoadingComponent from "../../../layout/LoadingComponent";
import { withFirestore, isEmpty, firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { addEventComment } from "../eventActions";

const mapState = (state, ownProps) => {
    let eventId = ownProps.match.params.id;

    let event = {};
    if (
        state.firestore.ordered.events &&
        state.firestore.ordered.events.length > 0
    ) {
        event =
            state.firestore.ordered.events.filter(
                (event) => event.id === eventId
            )[0] || {};
    }
    return {
        event,
        auth: state.firebase.auth,
        eventChat:
            !isEmpty(state.firebase.data.event_chat) &&
            objectToArray(
                state.firebase.data.event_chat[ownProps.match.params.id]
            ),
        loading: state.async.loading,
    };
};

const actions = {
    goingToEvent,
    cancelGoingToEvent,
    addEventComment,
};
class EventDetailedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nullEvent: false,
            isEvent: true,
        };
    }

    async componentDidMount() {
        const { firestore, match } = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }
    async componentWillUnmount() {
        const { firestore, match } = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }
    render() {
        const {
            event,
            isMobile,
            auth,
            goingToEvent,
            cancelGoingToEvent,
            addEventComment,
            eventChat,
            loading,
        } = this.props;
        const attendees =
            event && event.attendees && objectToArray(event.attendees);

        const isHost = event.hostUid === auth.uid;
        const isGoing = attendees && attendees.some((a) => a.id === auth.uid);
        const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
        if (this.state.nullEvent) {
            return <EventNotFound />;
        }
        if (isEmpty(event)) {
            return (
                <LoadingComponent
                    loaderWidth={"80px"}
                    loadingMessage={"Loading event.."}
                />
            );
        }
        return (
            <div>
                {event !== undefined ? (
                    <div className="row">
                        <div className={`col-md-8 ${isMobile() && "p-0"}`}>
                            <EventDetailedHeader
                                event={event}
                                isHost={isHost}
                                isGoing={isGoing}
                                goingToEvent={goingToEvent}
                                cancelGoingToEvent={cancelGoingToEvent}
                                loading={loading}
                            />
                            <EventDetailedInfo event={event} />
                            <EventDetailedChat
                                eventChat={chatTree}
                                addEventComment={addEventComment}
                                eventId={event.id}
                            />
                        </div>
                        <div className="col-md-4">
                            <EventDetailedSidebar
                                attendees={attendees}
                                hostName={event.hostedBy}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center h1">Sorry! Event Not FOund</div>
                )}
            </div>
        );
    }
}

export default compose(
    withFirestore,
    connect(mapState, actions),
    firebaseConnect((props) => [`event_chat/${props.match.params.id}`]),
    withGetScreen
)(EventDetailedPage);

// withFirestore(
//     connect(
//         mapState,
//         actions
//     )(
//         firebaseConnect((props) => [`event_chat/${props.match.params.id}`])(
//             withGetScreen(EventDetailedPage)
//         )
//     )
// );
