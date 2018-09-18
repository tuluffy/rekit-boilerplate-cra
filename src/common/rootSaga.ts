const featureSagas: any[] = [
];

const sagas = featureSagas
  .reduce(
    (prev, curr) => [
      ...prev,
      ...Object.keys(curr).map(k => curr[k]),
    ], []
  ).filter(
    (s: any) => typeof s === 'function'
  );

export default function* rootSaga() {
  yield sagas.map((saga: any) => saga());
}