import { Button } from "@/components/ui/button";
import React from "react";
import { Plus, Users } from "lucide-react";

const Page = () => {
  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center w-full">
      <div className="flex gap-8 items-center justify-center w-1/2 bg-slate-500 h-[40vh] rounded-lg shadow-lg">
        <Button variant="outline" className="py-8 px-16 flex items-center gap-4">
          <Plus className="w-6 h-6" />
          Create
        </Button>
        <Button variant="outline" className="py-8 px-16 flex items-center gap-4">
          <Users className="w-6 h-6" />
          Join
        </Button>
      </div>
    </div>
  );
};

export default Page;
