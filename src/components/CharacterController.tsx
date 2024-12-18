import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier"
import { Character } from "./Character"
import { useEffect, useRef, useState } from "react"
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useKeyboardControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;

  return angle;
}

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const CAMERA_SETUPS = {
  far: { x: 0, y: 4, z: -4 },
  near: { x: 0, y: 0.8, z: -2.2 },
}

export const CharacterController = () => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED, JUMP_ALTITUDE } = useControls("Character Control", {
    WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
    RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
    ROTATION_SPEED: {
      value: degToRad(0.5),
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1)
    },
    JUMP_ALTITUDE: { value: 3, min: 1, max: 10, step: 0.5 }
  });

  const { CAMERA_POSITION } = useControls("Camera", {
    CAMERA_POSITION: {
      value: CAMERA_SETUPS.near,
      min: -10,
      max: 10,
      step: 0.1
    }
  })

  const [animation, setAnimation] = useState("idle");

  const rigidBody = useRef<any>();
  const container = useRef<any>();
  const cameraTarget = useRef<any>();
  const cameraPosition = useRef<any>();
  const character = useRef<any>();
  const rotationTarget = useRef<number>(0);
  const characterRotationTarget = useRef<number>(0);

  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);

  const inTheAir = useRef(true);
  const landed = useRef(false);

  // useEffect(() => {
  //   const onMouseDown = (e: any) => {
  //     isClicking.current = true;
  //   }
  //   const onMouseUp = (e: any) => {
  //     isClicking.current = false;
  //   }
  //   document.addEventListener("mousedown", onMouseDown);
  //   document.addEventListener("mouseup", onMouseUp);
  //   // touch
  //   document.addEventListener("touchstart", onMouseDown);
  //   document.addEventListener("touchend", onMouseUp);
  //   return () => {
  //     document.removeEventListener("mousedown", onMouseDown);
  //     document.removeEventListener("mouseup", onMouseUp);
  //     document.removeEventListener("touchstart", onMouseDown);
  //     document.removeEventListener("touchend", onMouseUp);
  //   }
  // }, []);  

  useFrame(({ camera, mouse }) => {

    if (rigidBody.current) {
      const vel = rigidBody.current.linvel();

      const movement = {
        x: 0,
        y: 0,
        z: 0,
      };

      // Z axis: forward + backward
      if(get().forward) {
        movement.z = 1;
      }
      if(get().backward) {
        movement.z = -1;
      }
      
      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }
        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }
      
      // X axis: left + right
      if(get().left) {
        movement.x = 1;
      }
      if(get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      // Compute velocity of movement for both axis
      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2( movement.x, movement.z );

        vel.x = Math.sin( rotationTarget.current + characterRotationTarget.current ) * speed;
        vel.z = Math.cos( rotationTarget.current + characterRotationTarget.current ) * speed;

        if(speed === RUN_SPEED) {
          setAnimation("run");
        } else {
          setAnimation("walk");
        }
      } else {
        setAnimation("idle");
        vel.x = 0;
        vel.z = 0;
      }

      // Jump
      if(get().jump && !inTheAir.current && landed.current) {
        vel.y += JUMP_ALTITUDE;
        inTheAir.current = true;
        landed.current = false;
      } else {
        vel.y = vel.y;
      }

      if (Math.abs(vel.y) > 3) {
        inTheAir.current = true;
        landed.current = false;
      } else {
        inTheAir.current = false;
      }

      // Set rotation
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );
      
      // Set linear velocity
      rigidBody.current.setLinvel(vel, true);
    }

    // Camera
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    // Camera position
    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    // Camera target
    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  })

  return (
    <RigidBody colliders={false} lockRotations ref={rigidBody}
      onCollisionEnter={(e) => {
        // Collision with the floor -> stop jump
        inTheAir.current = false;
        landed.current = true;
        const curVel = rigidBody.current.linvel();
        curVel.y = 0;
        rigidBody.current.setLinvel(curVel);
      }}
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-x={CAMERA_POSITION.x} position-y={CAMERA_POSITION.y} position-z={CAMERA_POSITION.z} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.25} animation={animation} />
        </group>
      </group>

      <CapsuleCollider args={[0.08, 0.15]}/>
    </RigidBody>
  )
}