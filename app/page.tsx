import Image from "next/image";
import Appbar from "./components/Appbar";
import Hero from "./components/Hero";
import StreamList from "./components/StreamList";
import Redirect from "./components/Redirect";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-300 via-purple-500">
      <Appbar />
      <Redirect/>
      <Hero />
      <StreamList/>
    </div>
  );
}
