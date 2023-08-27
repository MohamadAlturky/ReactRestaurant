import { useState } from "react";
import "./findCustomer.css";
import ClientContext from "../../contexts/api/ClientContext";
import { OutletContextType } from "../../authentication/models/OutletContextType";
import { useCookies } from "react-cookie";
import { useOutletContext } from "react-router-dom";
import IResult from "../../models/IResult";
import Swal from "sweetalert2";

export default function FindCustomer() {
  const [serialNumber, setSerialNumber] = useState<number>();
  const [cookies] = useCookies(["jwt"]);
  const { outLetProps } = useOutletContext<OutletContextType>();
  const clientContext = new ClientContext(outLetProps.error401Handler);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (serialNumber && serialNumber >= 0) {
      let token = cookies.jwt;
      clientContext
        .get<IResult>("api/Customer/GetBySerialNumber" + serialNumber, token)
        .then(() => {});
    } else {
      Swal.fire({
        title: "خطأ",
        text: "الرجاء ملىء جميع الحقول بشكل صحيح",
        icon: "error",
        confirmButtonText: "حسناً",
      });
    }
  };
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <div className="scale-sider"></div>
          <form className="edit-pricing-form" onSubmit={handleSubmit}>
            <div className="create-meal-label">🔎عرض معلومات زبون</div>

            <div className="input-container-on-meal-form">
              <input
                className="create-meal-input"
                type="number"
                placeholder="الرقم الذاتي"
                dir="rtl"
                value={serialNumber}
                onChange={(event) => {
                  setSerialNumber(parseInt(event.target.value));
                }}
              />
              <div className="input-svg"></div>
            </div>
            <button type="submit" className="submit-create-meal">
              <p>البحث</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
