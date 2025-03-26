import Cookies from "js-cookie";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import * as yup from "yup";
import { Button } from "../../../../shared";
import Fields from "../../../../shared/Form/Fields/Fields";
import Form from "../../../../shared/Form/Form";
import { bookingpackagesApi } from "../../Api";
const Booking = ({ isModalOpen, handleBookingClose }) => {
  const { reset } = useForm();
  const schema = yup.object().shape({
    slotsBooked: yup.string().required("slotsBooked is required"),
  });
  const { id } = useParams();
  const onSubmit = (value) => {
    console.log(value);
    const travelerid = Cookies.get("userId");
    const data = {
      travelerId: travelerid,
      packageId: id,
      ...value,
    };
    bookingpackagesApi(data);
    reset();
    handleBookingClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleBookingClose}
      size="small"
      dimmer="blurring"
    >
      <Modal.Header>Confirm Booking</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit} validateSchemas={schema}>
          <Fields.Input
            name="slotsBooked"
            type="number"
            label="Book your slots"
            placeholder="select your slots"
          />
          {/* <Fields.FileUploads
          name="IdProofe"
          label="Upload Your IdProofe"
          placeholder="Upload Your IdProofe (AdharCard,panCard,DrivingLicence)"
        /> */}
          <div style={{ padding: "10px 30px" }}>
            <Button type="submit" primary fluid>
              Confirm Booking
            </Button>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleBookingClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Booking;
