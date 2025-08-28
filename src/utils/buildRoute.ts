function buildRoute(route: string, params: Record<string, string | number>) {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    route
  );
}

export default buildRoute;
