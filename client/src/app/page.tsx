import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Navbar></Navbar>
      {/* <div className="h-[812px] flex items-center justify-center"> */}
      <div>
        <img
          src="/images/scandinavian-interior-mockup-wall-decal-background 1home_bg.png"
          alt=""
        />
      </div>
    </div>
  );
}
