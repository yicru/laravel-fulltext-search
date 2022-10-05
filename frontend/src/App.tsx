import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  StackDivider,
  Text,
  Link,
  VStack,
} from "@chakra-ui/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useDebounceValue } from "./hooks/useDebouceValue";
import { useSearchBuilding } from "./hooks/useSearchBuilding";

function App() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const [keyword, setKeyword] = useState("");
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 35.69575,
    lng: 139.77521,
  });
  const [distance, setDistance] = useState(0);

  const [debounceKeyword] = useDebounceValue(keyword, 500);
  const [debounceCenter] = useDebounceValue(center, 500);
  const [debounceDistance] = useDebounceValue(distance, 500);

  const { data } = useSearchBuilding({
    query: debounceKeyword,
    lat: debounceCenter.lat,
    lng: debounceCenter.lng,
    distance: debounceDistance,
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onChangeBounds = () => {
    const bounds = mapRef.current?.getBounds();

    if (!bounds) return;

    const newDistance = google.maps.geometry.spherical.computeDistanceBetween(
      bounds.getSouthWest(),
      bounds.getNorthEast()
    );

    setDistance(newDistance / 2);
  };

  const onChangeCenter = () => {
    const newCenter = mapRef.current?.getCenter();
    const newLat = newCenter?.lat();
    const newLng = newCenter?.lng();

    if (!newLat || !newLng) return;

    setCenter({ lat: newLat, lng: newLng });
  };

  return (
    <Flex>
      <Flex
        direction={"column"}
        h={"100vh"}
        width={"lg"}
        zIndex={10}
        p={10}
        boxShadow={"xl"}
      >
        <FormControl>
          <FormLabel>検索キーワード</FormLabel>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            size={"sm"}
          />
        </FormControl>
        <Text mt={2}>latitude: {center.lat}</Text>
        <Text>longitude: {center.lng}</Text>
        <Divider my={4} />
        <HStack>
          <Text>総件数： {data?.length}</Text>
          <Spacer />
          <Button
            href={"http://localhost:7700"}
            as={Link}
            size={"xs"}
            colorScheme={"pink"}
            target={"_blank"}
          >
            Meilisearch
          </Button>
        </HStack>
        <VStack
          flex={1}
          divider={<StackDivider />}
          mt={4}
          overflow={"scroll"}
          h={"100%"}
        >
          {data?.map((building) => (
            <Box w={"full"} key={building.id}>
              <Text>{building.name}</Text>
              <Text fontSize={"xs"}>
                {[
                  building.postal_code,
                  building.prefecture.name,
                  building.city,
                  building.block,
                  building.building,
                ].join(" ")}
              </Text>
            </Box>
          ))}
        </VStack>
      </Flex>
      <GoogleMap
        center={debounceCenter}
        onLoad={onLoad}
        onCenterChanged={onChangeCenter}
        onBoundsChanged={onChangeBounds}
        options={{
          disableDefaultUI: true,
          styles: [
            {
              elementType: "labels",
              featureType: "all",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
        mapContainerStyle={{ flex: 1, height: "100vh" }}
        zoom={10}
      >
        {data?.map((building) => (
          <Marker
            key={building.id}
            position={{ lat: building.latitude, lng: building.longitude }}
          />
        ))}
      </GoogleMap>
    </Flex>
  );
}

export default App;
