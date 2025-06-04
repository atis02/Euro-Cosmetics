import { Stack } from "@mui/material";
import { useState } from "react";
import { DeliveryType } from "./DeliveryType";
import ShopDetailFields from "./ShopDetailFields";
import { DeliveryCities } from "./DeliveryCities";
import { Total } from "../Total";
import { CustomButtonSecond } from "../../../../Components/utils/CustomButtonSecond";
import { PaymentType } from "./PaymentType";
import CustomAccordion from "../../../../Components/utils/CustomAccordion";
import { DeliveryTime } from "./DeliveryTime";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../../../Components/utils/interfaces";
import { BASE_URL } from "../../../../Fetcher/swrConfig";
import { OpenNotification } from "../../../../Components/utils/CustomToast";
import { CheckCircleOutlined } from "@mui/icons-material";
import { setOpenCart } from "../../../../Components/redux/reducers/swiperSlice";
import { clearCart } from "../../../../Components/redux/reducers/cartSlice";

export const DeliveryDetails = () => {
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandedDelTime, setExpandedDelTime] = useState<boolean>(false);
  const [expandedPaymentType, setExpandedPaymentType] =
    useState<boolean>(false);
  const [deliveryCity, setDeliveryCity] = useState<string | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(
    null
  );
  const [deliveryTime, setDeliveryTime] = useState("");
  const [errorFields, setErrorFields] = useState({
    city: false,
    deliveryMethod: false,
    deliveryCity: false,
    paymentType: false,
    deliveryTime: false,
    phoneNumber: false,
  });
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleDelMethodChange = (value: string) => {
    setDeliveryMethod(value);
    if (value.trim() !== "") {
      setErrorFields((prev) => ({ ...prev, deliveryMethod: false }));
    }
  };
  const handleCityChange = (value: string) => {
    setCity(value);
    if (value.trim() !== "") {
      setErrorFields((prev) => ({ ...prev, city: false }));
    }
  };
  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    if (value.trim() !== "" && value.length >= 8) {
      setErrorFields((prev) => ({ ...prev, phoneNumber: false }));
    }
  };
  const handlePaymentTypeChange = (value: string) => {
    setSelectedPaymentType(value);
    if (value.trim() !== "") {
      setErrorFields((prev) => ({ ...prev, paymentType: false }));
    }
  };
  const handleDeliveryTimeChange = (value: string) => {
    setDeliveryTime(value);
    if (value.trim() !== "") {
      setErrorFields((prev) => ({ ...prev, deliveryTime: false }));
    }
  };
  const handleDeliveryCityChange = (value: string) => {
    setDeliveryCity(value);

    if (value.trim() !== "") {
      setErrorFields((prev) => ({ ...prev, deliveryCity: false }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      city: !city,
      deliveryMethod: !deliveryMethod,
      deliveryCity:
        (deliveryMethod === "Эскпресс" || deliveryMethod === "Kурьер") &&
        !deliveryCity,

      paymentType: !selectedPaymentType,
      deliveryTime: !deliveryTime,
      phoneNumber: !phoneNumber || phoneNumber.length < 8,
    };

    setErrorFields(newErrors);

    if (Object.values(newErrors).some((v) => v)) {
      return;
    }
    const totalSum = cartItems.reduce(
      (sum: number, item: CartItem) =>
        sum + item.product?.currentSellPrice * item.quantity,

      0
    );
    const formData = {
      phoneNumber: `993 ${phoneNumber}`,
      sum: totalSum,
      address: city,
      comment: comment,
      orderItems: cartItems.map((item: any) => ({
        barcode: item.product?.barcode,
        quantity: item.quantity,
      })),
      paymentTypeId: Number(selectedPaymentType),
      deliveryTypeId: Number(deliveryMethod),
      orderStatusId: 1,
      orderTimeId: Number(deliveryTime),
    };

    try {
      const res = await fetch(BASE_URL + "/orders/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Ошибка отправки");
      OpenNotification({
        text: "Успешно отправлено!",
        icon: <CheckCircleOutlined sx={{ color: "green" }} />,
      });
      dispatch(setOpenCart(false));
      dispatch(clearCart());
    } catch (err) {
      alert("Ошибка при отправке формы");
      console.error(err);
    }
  };

  return (
    <Stack gap={2}>
      <DeliveryType
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={handleDelMethodChange}
        errorFields={errorFields}
      />
      {(deliveryMethod === "1" || deliveryMethod === "2") && (
        <CustomAccordion
          expanded={expanded}
          setExpanded={setExpanded}
          isHasValue={errorFields.deliveryCity}
          text="Выберите город доставки"
          children={
            <DeliveryCities
              selectedCity={deliveryCity}
              setSelectedCity={handleDeliveryCityChange}
              errorFields={errorFields}
            />
          }
        />
      )}
      <ShopDetailFields
        city={city}
        setCity={handleCityChange}
        comment={comment}
        setComment={setComment}
        errorFields={errorFields}
        phoneNumber={phoneNumber}
        setPhoneNumber={handlePhoneNumberChange}
      />

      <CustomAccordion
        expanded={expandedPaymentType}
        setExpanded={setExpandedPaymentType}
        isHasValue={errorFields.paymentType}
        text="Выберите вид оплаты"
        children={
          <PaymentType
            selectedPaymentType={selectedPaymentType}
            setSelectedPaymentType={handlePaymentTypeChange}
            errorFields={errorFields}
          />
        }
      />
      <CustomAccordion
        expanded={expandedDelTime}
        setExpanded={setExpandedDelTime}
        isHasValue={errorFields.deliveryTime}
        text="Выберите время доставки"
        children={
          <DeliveryTime
            selectedPaymentType={deliveryTime}
            setSelectedPaymentType={handleDeliveryTimeChange}
            errorFields={errorFields}
          />
        }
      />
      <Total />
      <CustomButtonSecond
        dontChange
        width="100%"
        text="ОФОРМИТЬ ЗАКАЗ"
        mt={3}
        func={handleSubmit}
      />
    </Stack>
  );
};
