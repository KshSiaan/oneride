import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { getBlogByIdApi } from "@/lib/api/core";
import { idk } from "@/lib/utils";
import Image from "next/image";
import { blankImg } from "@/lib/config";
import { imgCreator } from "@/lib/func/functions";

import SafeComponent from "./safe-content";
export default async function Blog({ id }: { id: string }) {
  const call: idk = await getBlogByIdApi(id);

  const info = call.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Badge className={`${getStatusColor(info.status)} font-medium`}>
            {info.status.charAt(0).toUpperCase() + info.status.slice(1)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(info.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{info.author}</span>
            </div>
          </div>
        </div>
        <Image
          src={info.thumbnail ? imgCreator(info.thumbnail) : blankImg}
          height={500}
          width={500}
          alt="thumbnail"
          className="w-full aspect-video bg-red-200 object-cover"
        ></Image>
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
          {info.title}
        </h1>

        <SafeComponent data={info.content} />
      </div>
    </div>
  );
}
