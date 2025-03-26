import React, { useState } from "react";
import Form from "../../../../shared/Form/Form";
import Fields from "../../../../shared/Form/Fields/Fields";
import { Button } from "../../../../shared";
import { theme } from "../../../../Theme/theme";
import * as yup from "yup";
import { Grid, Segment, Header } from "semantic-ui-react";
import { CreatepackagesApi } from "../../Api";
import { useForm } from "react-hook-form";

const PackagesCreate = ({ loading }) => {
  const { reset } = useForm();

  const schema = yup.object().shape({
    title: yup.string().required("title is required"),
    agency: yup.string().required("agency is required"),
    mainLocation: yup.string().required("mainLocation is required"),
    fromLocation: yup.string().required("fromLocation is required"),
    toLocation: yup.string().required("toLocation is required"),
    startDate: yup.string().required("startDate is required"),
    endDate: yup.string().required("endDate is required"),
    description: yup.string().required("description is required"),
    servicesAndFacilities: yup
      .string()
      .required("servicesAndFacilities is required"),
    activities: yup.string().required("activities is required"),
    itinerary: yup.string().required("itinerary is required"),
    price: yup.string().required("price is required"),
    maxSlots: yup.string().required("maxSlots is required"),
    availableSlots: yup.string().required("availableSlots is required"),
    // photos: yup.mixed().required("photos are required"),
  });
  const [file, setFile] = useState([]);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = async (value) => {
    const formData = new FormData();

    // file.forEach((file, index) => {
    formData.append("photos", file);
    // });
    // const res = await uploadfile(formData);

    const data = {
      ...value,
      photos: file,
    };

    console.log(data);
    CreatepackagesApi(data);
    reset();
  };

  return (
    <Segment padded style={{ padding: "20px", marginBottom: "50px" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "30px" }}>
        Create Package
      </Header>
      <Form
        onSubmit={onSubmit}
        validateSchemas={schema}
        encType="multipart/form-data"
      >
        <Grid stackable columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Fields.Input
                name="title"
                label="Title"
                placeholder="Enter title"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input
                name="agency"
                label="Agency Name"
                placeholder="Enter agency name"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.Input
                name="mainLocation"
                label="Main Location"
                placeholder="Enter main location"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input
                name="fromLocation"
                label="From Location"
                placeholder="Enter from location"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.Input
                name="toLocation"
                label="To Location"
                placeholder="Enter to location"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input name="startDate" label="Start Date" type="date" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.Input name="endDate" label="End Date" type="date" />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input
                name="activities"
                label="Activities"
                placeholder="Enter activities"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.TextArea
                name="servicesAndFacilities"
                label="Services & Facilities"
                placeholder="Enter details"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.TextArea
                name="description"
                label="Description"
                placeholder="Enter package description"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.TextArea
                name="itinerary"
                label="Itinerary"
                rows={4}
                placeholder="Enter itinerary"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input
                name="maxSlots"
                label="Max Slots"
                type="number"
                placeholder="Enter max slots"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.Input
                name="availableSlots"
                label="Available Slots"
                type="number"
                placeholder="Enter available slots"
              />
            </Grid.Column>
            <Grid.Column>
              <Fields.Input
                name="price"
                label="Price"
                type="number"
                placeholder="Enter price"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Fields.FileUploads
                name="photos"
                label="Upload Photos"
                multiple={true}
                accept="*"
                onChange={handleChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={{ textAlign: "center", marginTop: "35px" }}>
          <Button
            type="submit"
            style={{
              background: theme.colors.blue,
              color: theme.colors.white,
              width: "50%",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </Segment>
  );
};

export default PackagesCreate;
