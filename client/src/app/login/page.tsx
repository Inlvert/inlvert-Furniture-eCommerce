import Frame from "@/components/Frame/Frame";
import Navbar from "@/components/Navbar/Navbar";

function Login() {
  return (
    <div className="flex items-center  flex-col">
      <Navbar />
      <Frame title="Login" />
    </div>
  )
}

export default Login;
