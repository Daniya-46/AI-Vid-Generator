interface Props {
  error: string | null;
}

export default function ErrorBanner({ error }: Props) {
  if (!error) return null;
  return (
    <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded">
      {error}
    </div>
  );
}
