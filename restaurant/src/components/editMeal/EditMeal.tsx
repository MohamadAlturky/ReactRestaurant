import Swal from "sweetalert2";
import { useState } from "react";
import { useCookies } from "react-cookie";
import IResult from "../../models/IResult";
import { useOutletContext } from "react-router-dom";
import ClientContext from "../../contexts/api/ClientContext";
import { OutletContextType } from "../../authentication/models/OutletContextType";
import { useParams } from "react-router-dom";

export default function EditMeal() {
  let { id } = useParams();
  console.log("idd", id);

  const [Id] = useState<string | null>(id ? id?.toString() : null);

  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [numberOfCalories, setNumberOfCalories] = useState<number | null>(null);
  const [mealType, setMealType] = useState<string>("NormalMeal");
  const [cookies] = useCookies(["jwt"]);
  const { outLetProps } = useOutletContext<OutletContextType>();
  const clientContext = new ClientContext(outLetProps.error401Handler);

  console.log("name", name);
  console.log("description", description);
  console.log("mealType", mealType);
  console.log("numberOfCalories", numberOfCalories);
  console.log("id", Id);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      numberOfCalories &&
      description &&
      name &&
      Id &&
      name != "" &&
      numberOfCalories > 0 &&
      description != ""
    ) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("numberOfCalories", numberOfCalories.toString());
      formData.append("type", mealType);
      formData.append("id", Id);
      let token = cookies.jwt;
      clientContext
        .put<IResult>(
          "api/Meals/Update",
          token,
          formData,
          "multipart/form-data"
        )
        .then((response) => {
          Swal.fire({
            title: "صح",
            text: response.status.toString(),
            icon: "success",
            confirmButtonText: "حسناً",
          });
        });
    } else {
      Swal.fire({
        title: "خطأ",
        text: "لم تقم بملئ جميع الحقول أستاذي الكريم حاول ثانية",
        icon: "error",
        confirmButtonText: "فهمت",
      });
    }
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleNumberOfCaloriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfCalories(parseInt(event.target.value));
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMealType(event.target.value);
  };
  console.log(id);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mt-5"
      >
        <div className="create-meal-form">
          <div className="create-meal-label">تعديل معلومات الوجبة</div>
          <div className="input-container-on-meal-form">
            <input
              className="create-meal-input"
              type="text"
              placeholder="اسم الوجبة"
              dir="rtl"
              onChange={handleNameChange}
            />
            <div className="input-svg"></div>
          </div>

          <div className="input-container-on-meal-form">
            <input
              className="create-meal-input"
              type="number"
              placeholder="عدد السعرات الحرارية"
              dir="rtl"
              onChange={handleNumberOfCaloriesChange}
            />
            <div className="input-svg"></div>
          </div>

          <div className="input-container-on-meal-form">
            <textarea
              className="form-control meal-description"
              placeholder="وصف الوجبة"
              rows={3}
              dir="rtl"
              onChange={handleDescriptionChange}
            ></textarea>

            <div className="input-svg"></div>
          </div>

          <div className="input-container-on-meal-form">
            <select
              value={mealType}
              className="form-select select-meal-type"
              aria-label="Default select example"
              dir="rtl"
              onChange={handleOptionChange}
            >
              <option value="NormalMeal">وجبة</option>
              <option value="Plate">صحن</option>
              <option value="Dinner">عشاء</option>
              <option value="BreakFast">فطور</option>
            </select>
          </div>

          <button type="submit" className="submit-create-meal">
            <p>تعديل</p>
          </button>
        </div>
      </form>
    </>
  );
}
