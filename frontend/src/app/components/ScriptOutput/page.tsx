interface Props {
  script: string | null;
}

export default function ScriptOutput({ script }: Props) {
  if (!script) return null;
  return (
    <div className="mt-10 bg-gray-100 p-4 rounded shadow">
      <h4 className="font-semibold mb-2">Generated Script</h4>
      <pre className="whitespace-pre-wrap text-gray-800">{script}</pre>
    </div>
  );
}
