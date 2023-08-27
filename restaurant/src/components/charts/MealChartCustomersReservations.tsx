import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { OutletContextType } from "../../authentication/models/OutletContextType";
import { useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ClientContext from "../../contexts/api/ClientContext";
import { useCookies } from "react-cookie";
import Result from "../../models/Result";
import { ResourceContext } from "../../contexts/resource/ResourceContext";

interface MealChartProps {
  mealId: number;
}
export default function MealChartCustomersReservations(props: MealChartProps) {
  const { outLetProps } = useOutletContext<OutletContextType>();
  const resources = useContext(ResourceContext);
  const [data, setData] = useState<ReservationsCustomerTypeReadModel[]>();
  const [normalizedData, setNormalizedData] =
    useState<ReservationsCustomerTypeReadModel[]>();
  const context = new ClientContext(outLetProps.error401Handler);
  const [cookies] = useCookies(["jwt"]);
  let token = cookies.jwt;

  useEffect(() => {
    if (data) {
      let arr: ReservationsCustomerTypeReadModel[] = [];
      for (let i = 0; i < data.length; i++) {
        let type = resources.CustomersTypes.find(
          (resource) => resource.id == data[i].customerType
        )?.name;
        if (type != undefined) {
          let value = {
            customerType: type,
            numberOfCustomers: data[i].numberOfCustomers,
          };
          arr.push(value);
        }
      }
      setNormalizedData(arr);
    }
  }, [data]);

  useEffect(() => {
    context
      .get<Result<ReservationsCustomerTypeReadModel[]>>(
        "api/Reservations/GetStatisticAboutReservationsCustomersType/" +
          props.mealId,
        token
      )
      .then((response) => {
        console.log("response");
        console.log(response.data.value);

        setData(response.data.value);
        // setData([
        //   {
        //     customerType: "طالب عامة",
        //     numberOfCustomers: 121,
        //   },
        //   {
        //     customerType: "طالب خاصة",
        //     numberOfCustomers: 232,
        //   },
        //   {
        //     customerType: "موظف",
        //     numberOfCustomers: 12,
        //   },
        //   {
        //     customerType: "طالب متميزين",
        //     numberOfCustomers: 33,
        //   },
        //   {
        //     customerType: "زائر",
        //     numberOfCustomers: 33,
        //   },
        // ]);
        // console.log(response.data);
      });
  }, []);
  console.log("normalizedData");
  console.log(normalizedData);

  return (
    <div className="container d-flex justify-content-center mt-5">
      {normalizedData == undefined && <h1> لا يوجد حجوزات حتى الآن</h1>}
      {normalizedData?.length == 0 && <h1> لا يوجد حجوزات حتى الآن</h1>}
      {normalizedData && normalizedData?.length != 0 && (
        <BarChart
          width={500}
          height={300}
          data={normalizedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="customerType"
            arabicForm="initial"
            //   scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            name="عدد الحجوزات"
            dataKey="numberOfCustomers"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      )}
    </div>
  );
}
