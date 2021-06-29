import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import UploadFiles from "./components/uploadFiles";
// import UploadFiles from "./sevices/uploadFiles";


function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
    <div className="my-2">
      <h3>콜러스 API 업로드</h3>
      <h4>React upload multiple Files</h4>
    </div>
    <UploadFiles />
 
  </div>
      
      
       
   

  );
}

export default App;
