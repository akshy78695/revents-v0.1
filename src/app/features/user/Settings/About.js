import React from "react";
import { Button, Divider, Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import InputRadio from "../../../common/form/InputRadio";
import InputTextarea from "../../../common/form/InputTextarea";
import SelectInput from "../../../common/form/SelectInput";
import InputText from "../../../common/form/InputText";
import PlaceInput from "../../../common/form/PlaceInput";

const interests = [
    { key: "drinks", text: "Drinks", value: "drinks" },
    { key: "culture", text: "Culture", value: "culture" },
    { key: "film", text: "Film", value: "film" },
    { key: "food", text: "Food", value: "food" },
    { key: "music", text: "Music", value: "music" },
    { key: "travel", text: "Travel", value: "travel" },
];

const About = ({ pristine, submitting, handleSubmit, updateProfile }) => {
    return (
        <Segment>
            <Header dividing size="large" content="About Me" />
            <p>Complete your profile to get the most out of this site</p>
            <Form
                onSubmit={handleSubmit(updateProfile)}
                style={{ marginBottom: "45px" }}
            >
                <Form.Group inline>
                    <label>Tell us your status: </label>
                    <Field
                        name="status"
                        component={InputRadio}
                        type="radio"
                        value="single"
                        label="Single"
                    />
                    <Field
                        name="status"
                        component={InputRadio}
                        type="radio"
                        value="relationship"
                        label="Relationship"
                    />
                    <Field
                        name="status"
                        component={InputRadio}
                        type="radio"
                        value="married"
                        label="Married"
                    />
                </Form.Group>
                <Divider />
                <label>Tell us about yourself</label>
                <Field
                    name="about"
                    component={InputTextarea}
                    placeholder="About Me"
                />
                <Field
                    name="interests"
                    component={SelectInput}
                    options={interests}
                    value="interests"
                    multiple={true}
                    placeholder="Select your interests"
                />
                <Field
                    width={8}
                    name="occupation"
                    type="text"
                    component={InputText}
                    placeholder="Occupation"
                />
                <Field
                    width={8}
                    name="origin"
                    options={{ types: ["(regions)"] }}
                    component={PlaceInput}
                    placeholder="Country of Origin"
                />
                <Divider />
                <Button
                    disabled={pristine || submitting}
                    size="large"
                    positive
                    content="Update Profile"
                />
            </Form>
        </Segment>
    );
};

export default reduxForm({
    form: "userProfile",
    enableReinitialize: true,
    destroyOnUnmount: false,
})(About);
