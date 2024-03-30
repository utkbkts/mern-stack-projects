import Card from "./dashboard/card/Card";
import "../ui/dashboard/dashboard.scss";
import Rightbar from "./dashboard/rightbar/Rightbar";
import Transaction from "./dashboard/transaction/Transaction";
import Chart from "./dashboard/chart/Chart";
const Home = () => {
  return (
    <div className="wrapper">
      <div className="main">
        <div className="cards">
          <Card />
          <Card />
          <Card />
        </div>
        <Transaction />
        <Chart />
      </div>
      <div className="side">
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
