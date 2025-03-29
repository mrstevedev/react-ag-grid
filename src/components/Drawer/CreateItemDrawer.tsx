import {
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export function CreateItemDrawer({ ...props }) {
  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    isOpen,
    onClose,
  } = props;
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Create new item</DrawerHeader>
        <DrawerBody>
          <form id="my-form" onSubmit={handleSubmit}>
            <Stack spacing="15px">
              <Box>
                <FormLabel htmlFor="make">Make</FormLabel>
                <Input
                  id="make"
                  name="make"
                  placeholder="Please enter a make"
                  onChange={handleChange}
                  value={values.make}
                />
                {touched.make && errors.make && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {errors.make}
                  </span>
                )}
              </Box>
              <Box gap={5}>
                <FormLabel htmlFor="model">Model</FormLabel>
                <Input
                  id="model"
                  placeholder="Please enter a model"
                  onChange={handleChange}
                  value={values.model}
                />
                {touched.model && errors.model && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {errors.model}
                  </span>
                )}
              </Box>
              <Box>
                <FormLabel htmlFor="type">Type</FormLabel>
                <Input
                  id="type"
                  placeholder="Please enter a type"
                  onChange={handleChange}
                  value={values.type}
                />
                {touched.type && errors.type && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {errors.type}
                  </span>
                )}
              </Box>
              <Box>
                <FormLabel htmlFor="year">Year</FormLabel>
                <Input
                  id="year"
                  type="number"
                  placeholder="Please enter a year"
                  onChange={handleChange}
                  value={values.year}
                />
                {touched.year && errors.year && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {errors.year}
                  </span>
                )}
              </Box>
            </Stack>
          </form>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="teal" form="my-form">
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateItemDrawer;
