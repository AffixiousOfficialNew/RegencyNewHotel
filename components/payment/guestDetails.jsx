"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Input,
  Divider,
} from "@heroui/react";
import { Controller, useFieldArray } from "react-hook-form";

export const GuestDetails = ({
  secondForm,
  setSecondForm,
  setFormData = () => {},
  form,
  data,
  RoomCount,
}) => {
  const {
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const formValues = watch();

  // Populate guests when RoomCount or occupancy data changes
  useEffect(() => {
    const occupancyList = data?.hotelDetails?.Hotelsearchrequest?.lstOccupancy;

    if (RoomCount && occupancyList?.length > 0) {
      remove(); // Reset

      // occupancyList.forEach((room, roomIndex) => {
      //   const adults = room?.AdultCount || 0;
      //   const children = room?.ChildCount || 0;

      //   for (let i = 0; i < adults; i++) {
      //     append({
      //       room: roomIndex + 1,
      //       type: "adult",
      //       title: "",
      //       firstName: "",
      //       lastName: "",
      //     });
      //   }

      //   for (let j = 0; j < children; j++) {
      //     append({
      //       room: roomIndex + 1,
      //       type: "child",
      //       title: "",
      //       firstName: "",
      //       lastName: "",
      //     });
      //   }
      // });
      occupancyList.forEach((room, roomIndex) => {
        const adults = room?.AdultCount || 0;
        const children = room?.ChildCount || 0;
        const guestList = room?.lstGuestList || [];
      
        for (let i = 0; i < adults; i++) {
          append({
            room: roomIndex + 1,
            type: "adult",
            title: "",
            firstName: "",
            lastName: "",
          });
        }
      
        const childrenGuests = guestList.filter((g) => g.GuestType === "CH");
        for (let j = 0; j < children; j++) {
          const childAge = childrenGuests[j]?.GuestAge || null;
      
          append({
            room: roomIndex + 1,
            type: "child",
            title: "",
            firstName: "",
            lastName: "",
            age: childAge, // ✅ Save age for display
          });
        }
      });
      
    }
  }, [RoomCount, data?.hotelDetails?.Hotelsearchrequest?.lstOccupancy]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      guestDetails: formValues,
    }));
  }, [formValues]);

  const groupedGuests = fields.reduce((acc, guest, index) => {
    const roomKey = guest.room || 1;
    if (!acc[roomKey]) acc[roomKey] = [];
    acc[roomKey].push({ ...guest, index });
    return acc;
  }, {});

  const renderGuestFields = (guest, idx, label) => (
    <div key={guest.index}>
      {idx > 0 && <Divider className="my-6" />}
      {/* <div className="mb-2 mt-3 font-semibold">{`${label} ${idx + 1}`}</div> */}
      <div className="mb-2 mt-3 font-semibold">
  {`${label} ${idx + 1}`}
  {guest.type === "child" && guest.age != null ? ` (${guest.age} years)` : ""}
  
</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Title */}
        <Controller
          name={`guests.${guest.index}.title`}
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Select
              isRequired
              variant="bordered"
              placeholder="Select title"
              className="w-full"
              selectedKeys={field.value ? [field.value] : []}
              onChange={field.onChange}
              classNames={{ trigger: "h-[48px] rounded-[5px]" }}
            >
              <SelectItem key="Mr">Mr</SelectItem>
              <SelectItem key="Mrs">Mrs</SelectItem>
              <SelectItem key="Ms">Ms</SelectItem>
              <SelectItem key="Dr">Dr</SelectItem>
            </Select>
          )}
        />

        {/* First Name */}
        <Controller
          name={`guests.${guest.index}.firstName`}
          control={control}
          rules={{ required: "First name required" }}
          render={({ field }) => (
            <Input
              isRequired
              variant="bordered"
              placeholder="- First Name -"
              className="w-full"
              classNames={{
                input: "ml-1",
                inputWrapper: "h-[48px] rounded-[5px]",
              }}
              {...field}
            />
          )}
        />

        {/* Last Name */}
        <Controller
          name={`guests.${guest.index}.lastName`}
          control={control}
          rules={{ required: "Last name required" }}
          render={({ field }) => (
            <Input
              isRequired
              variant="bordered"
              placeholder="- Last Name -"
              className="w-full"
              classNames={{
                input: "ml-1",
                inputWrapper: "h-[48px] rounded-[5px]",
              }}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );

  return (
    <Card className="shadow-sm">
      <CardBody className="border shadow-xl">
        <h2 className="mb-2 text-xl font-semibold">Guest Details</h2>
        <div className="py-4">
          {Object.entries(groupedGuests).map(([roomNumber, guestsInRoom]) => {
            const adults = guestsInRoom.filter((g) => g.type === "adult");
            const children = guestsInRoom.filter((g) => g.type === "child");

            return (
              <div key={roomNumber}>
                <div
                  className="flex items-center rounded-[5px] p-3 text-white"
                  style={{ margin: "15px 0",  backgroundColor:"#e41b23" }}
                >
                  <div className="mr-4 px-2 py-1 font-medium">{`Room ${roomNumber}:`}</div>
                  <div className="text-sm">Room Type: {data?.hotelDetails?.HotelRooms?.[0]?.ListOfRoom?.[0]?.RoomType}</div>
                </div>

                {/* Adults */}
                {adults.map((guest, idx) =>
                  renderGuestFields(guest, idx, "Adult")
                )}

                {/* Children */}
                {children.map((guest, idx) =>
                  renderGuestFields(guest, idx, "Child")
                )}
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
