import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// @ts-ignore
import youtubesearch from "youtube-search-api";
import { error } from "console";

var YT_REGEX =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
const SPOTIFY_REGEX = new RegExp("");

const CreatStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreatStreamSchema.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);

    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong URL format",
        },
        {
          status: 411,
        }
      );
    }
    const extractedId = data.url.split("?v=")[1];
    const ytVideo = await youtubesearch.GetVideoDetails(extractedId);

    const thumbnails = ytVideo.thumbnail.thumbnails;

    thumbnails.sort((a: { width: number }, b: { width: number }) => {
      a.width < b.width ? -1 : 1;
    });

    console.log(thumbnails);

    const newStream = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: ytVideo.title ?? "(not found)",
        smThumbnail:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1]).url ??
          "https://i.pinimg.com/736x/71/36/4e/71364e0c647ceabc974f3d3231823e41.jpg",
        bgThumbnail:
          thumbnails[thumbnails.length - 1].url ??
          "https://i.pinimg.com/736x/71/36/4e/71364e0c647ceabc974f3d3231823e41.jpg",
      },
    });

    return NextResponse.json({
      message: "stream Added",
      id: newStream.id,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding a stream ",
        error: e
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prisma.stream.findMany({
      where: {
        userId: creatorId || "",
      },
    });

    return NextResponse.json({
      streams,
    });
  } catch (e) {}
}
