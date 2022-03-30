import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const commentRouter = trpc
  .router<Context>()
  .query("getAllByVideoId", {
    input: z.string(),
    async resolve({ input }) {
      return await prisma.comment.findMany({
        where: {
          videoId: input,
        },
        select: {
          body: true,
          id: true,
          timecode: true,
          userId: true,
        },
        orderBy: {
          timecode: "asc",
        },
      });
    },
  })
  .mutation("send", {
    input: z.object({
      videoId: z.string(),
      userId: z.string(),
      body: z.string(),
      timecode: z.number(),
    }),
    async resolve({ input }) {
      return await prisma.comment.create({
        data: {
          ...input,
        },
      });
    },
  });

const createContext = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return {};
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

const appRouter = trpc.router<Context>().merge("comments.", commentRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
