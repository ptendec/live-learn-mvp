import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const commentRouter = trpc
  .router()
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

const userRouter = trpc.router();

const appRouter = trpc
  .router()
  .merge("user.", userRouter)
  .merge("comments.", commentRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
