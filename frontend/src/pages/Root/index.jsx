import Header from "../../layouts/Header";
import Main from "../../layouts/Main";
import Footer from "../../layouts/Footer";

export default function Root(){
  return (
    <div className="c-container">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}