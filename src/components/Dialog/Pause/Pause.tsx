import { Pause, Play } from "lucide-react";
import { memo, useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Checkbox,
} from "~/components/ui";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

type PauseDialogProps = {
  paused: boolean;
  disabled: boolean;
  onPause: () => void;
  onContinue: () => void;
  showWarning?: boolean;
};

const PauseDialog = ({
  paused,
  disabled,
  onContinue,
  onPause,
  showWarning = false,
}: PauseDialogProps) => {
  const locale = useLocaleStore((state) => state.locale);
  const [hide, setHide] = useState(false);
  const [, setSavedShowWarning] = useLocalStorage("hide-pause-warning", false);
  const hideWarning = useReadLocalStorage("hide-pause-warning") as boolean;

  const handlePause = () => {
    if (hide) setSavedShowWarning(true);
    onPause();
  };

  return !paused ? (
    showWarning && !hideWarning ? (
      <AlertDialog>
        <AlertDialogTrigger
          disabled={disabled}
          className="flex h-[2.5rem] w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          <Pause className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">
            {i18n[locale].inProgressPage.pause.labelPause}
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {i18n[locale].inProgressPage.pause.warning.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {i18n[locale].inProgressPage.pause.warning.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="hide-warning"
                checked={hide}
                onCheckedChange={(checked) => setHide(Boolean(checked))}
              />
              <label htmlFor="hide-warning" className="text-sm">
                {i18n[locale].inProgressPage.pause.warning.showAgain}
              </label>
            </div>

            <AlertDialogAction
              onClick={handlePause}
              className="justify-self-end"
            >
              {i18n[locale].inProgressPage.pause.warning.action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <Button
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2"
        onClick={handlePause}
      >
        <Pause className="h-4 w-4 fill-current" />
        {i18n[locale].inProgressPage.pause.labelPause}
      </Button>
    )
  ) : (
    <Button
      disabled={disabled}
      onClick={() => onContinue()}
      className="flex w-full items-center justify-center gap-2"
    >
      <Play className="h-4 w-4 fill-current" />
      {i18n[locale].inProgressPage.pause.labelContinue}
    </Button>
  );
};

export default memo(PauseDialog);
