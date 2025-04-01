"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Switch, Tooltip } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="fixed top-4 right-4 z-[101] p-4 rounded-full">
      <Tooltip
        content={`Switch to ${isDark ? "light" : "dark"} mode`}
        placement="left"
      >
        <div className="flex items-center gap-2">
          <Icon
            className={`text-default-500 ${!isDark && "text-primary-500"}`}
            icon="lucide:sun"
          />
          <Switch
            className="mx-1"
            color="primary"
            isSelected={isDark}
            size="sm"
            onValueChange={handleToggle}
          />
          <Icon
            className={`text-default-500 ${isDark && "text-primary-500"}`}
            icon="lucide:moon"
          />
        </div>
      </Tooltip>
    </div>
  );
};
