const test = require('tape');
const tapSpec = require('tap-spec');
const axios = require('axios');
test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout);

const before = test;

// edge-router will be the host
const host = 'edge-router';
const port = 80;
const baseURL = `http://${host}:${port}`

// Health Check Test
before('before', (t) => {
    t.plan(1);

    setTimeout(() => {
        performHealthCheck((error) => {
            if (!error) {
                t.pass('Health check passed, setup complete');
            } else {
                t.fail('Health check failed, setup failed');
            }
    
            t.end();
        });

    }, 10000)

    function performHealthCheck(callback) {
        const healthCheck = () => {
            return new Promise((resolve, reject) => {
                axios.get(`${baseURL}/catalogue`)
                    .then((response) => {
                        if (response.status === 200 && Array.isArray(response.data)) {
                            resolve();
                        } else {
                            reject('Health Check Failed');
                        }
                    })
                    .catch((error) => {
                        reject('Health Check Failed');
                    });
            });
        }

        healthCheck()
            .then(() => {
                callback(null);
            })
            .catch((error) => {
                console.error(error);
                callback('Health check failed'); 
            });
    }
});

// List of catalagues test
test('Catalogue Service Integration Test - List of Items', async (t) => {
    t.plan(3);
    try {
        const response = await axios.get(`${baseURL}/catalogue`);
        t.equal(response.status, 200, 'HTTP status code should be 200');
        const responseBody = response.data;
        t.ok(Array.isArray(responseBody), 'Response should be an array');
        t.ok(responseBody.length > 0, 'Response should contain items');
    } catch (error) {
        console.log(error)
        t.fail(error.message);
    }
});

// Get catalogues by id
test('Catalogue Service Integration Test - Get Item by id', async (t) => {
    t.plan(8);
    const catalogueID = "a0a4f044-b040-410d-8ead-4de0446aec7e"
    try {
        const response = await axios.get(`${baseURL}/catalogue/${catalogueID}`);
        t.equal(response.status, 200, 'HTTP status code should be 200');
        const responseBody = response.data;
        console.log(typeof responseBody.count)
        t.equal(responseBody.id, catalogueID, `id should be a ${catalogueID}`);
        t.equal(typeof responseBody.name, 'string', 'name should be a string');
        t.equal(typeof responseBody.description, 'string', 'description should be a string');
        t.ok(Array.isArray(responseBody.imageUrl), 'imageUrl should be an array');
        t.equal(typeof responseBody.price, 'number', 'price should be a number');
        t.equal(typeof responseBody.count, 'number', 'count should be a number');
        t.ok(Array.isArray(responseBody.tag), 'tag should be an array');
    } catch (error) {
        console.log(error)
        t.fail(error.message);
    }
});

// Get catalogues sizes
test('Catalogue Service Integration Test - Get size', async (t) => {
    t.plan(3);
    try {
        const response = await axios.get(`${baseURL}/catalogue/size`);
        t.equal(response.status, 200, 'HTTP status code should be 200');
        const responseBody = response.data;
        t.equal(responseBody.size, 9, `size should be a 9`);
        t.equal(responseBody.err, null, 'err should be a null');
    } catch (error) {
        console.log(error)
        t.fail(error.message);
    }
});