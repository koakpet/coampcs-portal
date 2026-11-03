// columns: [{ key, label, align?: "right", render?: (row) => JSX }]
export default function DataTable({ columns, rows, empty = "Nothing to show yet." }) {
  if (rows.length === 0) return <p className="adm-empty">{empty}</p>;
  return (
    <div className="adm-tablewrap">
      <table className="adm-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.align === "right" ? "num" : ""}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? row.no ?? i}>
              {columns.map((c) => (
                <td key={c.key} className={c.align === "right" ? "num" : ""}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
