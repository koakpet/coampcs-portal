export default function PageHeader({ title, description, children }) {
  return (
    <div className="adm-pagehead">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="adm-pagehead-actions">{children}</div>}
    </div>
  );
}
