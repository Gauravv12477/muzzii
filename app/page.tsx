import Image from "next/image";
import Appbar from "./components/Appbar";
import Hero from "./components/Hero";
import StreamList from "./components/StreamList";
import Redirect from "./components/Redirect";

export default function Home() {
  return (
    <div>
      <Redirect />
      <Hero />
      <StreamList />
    </div>
  );
}
