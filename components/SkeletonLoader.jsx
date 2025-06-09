import React, { Fragment } from "react";
import { Card, Skeleton } from "@heroui/react";
const SkeletonLoader = () => {
    const dataArray = new Array(20).fill(null);
  return (
    <Fragment>
      <section className="w-full">
        {dataArray.map((_, index) => (
        <Card className=" p-4 mb-5" radius="lg" key={index}>
          <div className="flex gap-5 ">
            <Skeleton className="rounded-lg w-[264px] h-[180px]">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3 w-full">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
               <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </div>

          
        </Card>
        
         ))}
      </section>
    </Fragment>
  );
};

export default SkeletonLoader;
