import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Header from "./Header";
import Routers from "./Routers";

function App() {
  return (
    <RecoilRoot>
      <Toaster />
      <div className="container mx-auto my-4">
        <Header />
        <Routers />
      </div>
    </RecoilRoot>
  );
}

export default App;
