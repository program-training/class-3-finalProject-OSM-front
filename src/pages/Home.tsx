import { LatestOrders } from "../components/LatestOrders";
import OverviewSection from "../components/OverviewSection";
import { OverviewTotalProfit } from "../components/OverviewTotalProfit";
function Home() {
  return (
    <div>
      <div>
      <OverviewSection />
      </div>
      <LatestOrders />
    </div>
  );
}

export default Home;
