import { CameraPlacement, CATEGORIES_NAMES } from "./contract";

export const CAMERA_PLACEMENTS: CameraPlacement[] = [
  {
    id: 0,
    name: CATEGORIES_NAMES.HEAD,
    position: [-1.3654570208900232, 1.0036451657553416, 1.8369778563502093],
    target: [-0.4557944112584553, 0.6151665126639292, -0.3155010401274379]
  },
  {
    id: 0,
    name: CATEGORIES_NAMES.HAIR,
    position: [-1.3953657470844316, 1.6422507095848395, 1.6067998806553112],
    target: [-0.4784913247498335, 0.5575204339027119, -0.2890557704263405]
  },
  {
    id: 0,
    name: CATEGORIES_NAMES.TOP,
    position: [-0.9104405845075295, 0.10673751922376629, 2.725020881725671],
    target: [-0.7239139167868957, -0.33411898183285615, -0.04449922349127218]
  },
  {
    id: 0,
    name: CATEGORIES_NAMES.BOTTOM,
    position: [-0.8152693857328168, -0.24941027347387673, 2.786883523085165],
    target: [-0.7087875151417409, -0.6701857330957164, 0.010015162987557584]
  },
  {
    id: 0,
    name: CATEGORIES_NAMES.SHOES,
    position: [-1.3340331801168661, -0.028996749237517938, 1.957088097622327],
    target: [-0.5989826845851365, -0.8199503446890802, -0.1559387938324661]
  }
];

export function findCameraPlacementByCategoryName(categoryName: CATEGORIES_NAMES): CameraPlacement | undefined {
  const camera = CAMERA_PLACEMENTS.find(cameraPlacement => cameraPlacement.name === categoryName);

  return camera;
}