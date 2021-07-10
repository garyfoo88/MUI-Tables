import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentNoSSR = dynamic(
  () => import("../../components/TableMain"),
  { ssr: false }
);

function Tables() {
  return (
    <>
      <DynamicComponentNoSSR />
    </>
  );
}

export default Tables;
