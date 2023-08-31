module.exports = {
    // resolves from test to snapshot path
    resolveSnapshotPath: (testPath, snapshotExtension) =>
        testPath.replace("__tests__", "__snapshots1__") + snapshotExtension,

    // resolves from snapshot to test path
    resolveTestPath: (snapshotFilePath, snapshotExtension) =>
        snapshotFilePath
            .replace("__snapshots1__", "__tests__")
            .slice(0, -snapshotExtension.length),

    // Example test path, used for preflight consistency check of the implementation above
    testPathForConsistencyCheck: "some/__tests__/example.test.js",
}
