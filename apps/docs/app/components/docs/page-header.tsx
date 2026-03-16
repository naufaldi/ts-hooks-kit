type Props = {
  title: string
  description?: string
}

export function PageHeader({ title, description }: Props) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      ) : null}
      <hr className="mt-6 border-border" />
    </header>
  )
}
