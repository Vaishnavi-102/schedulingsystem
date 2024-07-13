import { LoadingOverlay } from "@mantine/core";

function Demo() {
  return (
    <>
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </>
  );
}

export default Demo;
