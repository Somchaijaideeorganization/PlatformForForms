"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const AIModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[101]">
      <Tooltip
        content="Chat with AI (Beta)"
        defaultOpen={true}
        isOpen={isTooltipOpen}
        placement="left"
        onOpenChange={(open) => setIsTooltipOpen(open)}
      >
        <Button
          isIconOnly
          className="bg-primary"
          size="lg"
          onPress={onOpen}
        >
          <Icon height={24} icon="basil:chat-solid" width={24} color="white" />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-6 text-center">
                <h1 className="font-bold text-xl">AI Chat (Beta)</h1>
                <h2 className="font-normal">Ask anything about the form</h2>
              </ModalHeader>
              <Divider className="my-2 w-3/4 mx-auto" />
              <ModalBody>
                <p className="mx-auto overflow-visible">
                  &lt; Conversation &gt;
                </p>
              </ModalBody>

              <ModalFooter className="justify-start">
                <Button color="primary" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AIModal;
