import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

type LoaderProps = {
  showText?: boolean;
};

const Loader = ({ showText = false }: LoaderProps) => {
  const locale = useLocaleStore((state) => state.locale);

  return (
    <div className="flex items-center justify-center gap-4 px-8 py-4 text-slate-600 dark:text-slate-500">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-b-transparent dark:border-slate-600 dark:border-b-transparent"></div>
      <span className={showText ? "block" : "hidden"}>
        {i18n[locale].loading}
      </span>
    </div>
  );
};

export default Loader;
