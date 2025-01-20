const { MongoClient } = require("mongodb");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

const generateReport = (documents) => {
  const report = {
    totalRecords: documents.length,
    sampleData: document.onvisibilitychange(0, 5),
  };
  return report;
};

// Query documents from a collection
const queryCollection = async (req, res) => {
  const { connectionString, dbName, collectionName, query, reportFormat = 'json' } = req.body;

  if (!connectionString || !dbName || !collectionName) {
    return res.status(400).json({ message: 'Connection string, database name, and collection name are required' });
  }

  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Execute the query (if provided)
    const documents = query ? await collection.find(query).toArray() : await collection.find({}).toArray();

    // Generate a report
    let reportPath;
    if (reportFormat === 'csv') {
      // Generate CSV report
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(documents);
      reportPath = path.join(__dirname, '../reports', `report_${Date.now()}.csv`);
      fs.writeFileSync(reportPath, csv);
    } else {
      // Default to JSON report
      reportPath = path.join(__dirname, '../reports', `report_${Date.now()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(documents, null, 2));
    }

    res.status(200).json({
      message: 'Query executed successfully',
      reportPath: reportPath.replace(__dirname, ''), // Return a relative path
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to query collection', error: error.message });
  }
};



//extract schema from a collection
const extractSchema = asyncHandler(async (req, res) => {
  const { connectionString, dbName, collectionName } = req.body;

  if (!connectionString || !dbName || !collectionName) {
    return res.status(400).json({
      message:
        "Connection string, database name and collection name are required",
    });
  }

  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //fetch a sample document from the collection
    const sampleDocument = await collection.findOne({});

    if (!sampleDocument) {
      return next(new ApiError(` No documents found in the collection`));
    }

    //extract schema from the sample document
    const schema = Object.keys(sampleDocument).reduce((acc, key) => {
      acc[key] = typeof sampleDocument[key]; //get datatype of each field
      return acc;
    }, {});
    res.status(200).json({ message: "Schema extracted successfully", schema });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to extract schema", error: error.message });
  }
});
//connect to an external mongodb database
const connectToDatabase = asyncHandler(async (req, res) => {
  const { connectionString, dbName } = req.body;
  if (!connectionString || !dbName) {
    return next(
      new ApiError(`Connection string and database name are required`, 404)
    );
  }

  try {
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
    });
    await client.connect();

    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    res.status(200).json({ message: "Connected to database", collections });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to connect to database", error: error.message });
  }
});

module.exports = { connectToDatabase, queryCollection, extractSchema };
