"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImgAnalysis } from "./_components/Img-analysis";
import { Ingredient } from "./_components/Ingredient";
import { ImgCreator } from "./_components/Img-creator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center mt-8">
        <Tabs defaultValue="img-analysis" className="w-105">
          <TabsList>
            <TabsTrigger value="img-analysis">Image analysis</TabsTrigger>
            <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
            <TabsTrigger value="img-creator">Image creator</TabsTrigger>
          </TabsList>
          <TabsContent value="img-analysis">
            <ImgAnalysis />
          </TabsContent>
          <TabsContent value="ingredient">
            <Ingredient />
          </TabsContent>
          <TabsContent value="img-creator">
            <ImgCreator />
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-6 right-6 z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="cursor-pointer rounded-full w-12 h-12">
              <MessageCircle />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-90">
            <div className="border-y-2 border-[#E4E4E7] w-full flex items-center">
              <h1 className="text-[#000000] text-[15px] font-semibold">
                Chat assistant
              </h1>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
