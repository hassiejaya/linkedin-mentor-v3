const DLP = require('@google-cloud/dlp');

const dlpClient = new DLP.DlpServiceClient({
  credentials: {
    client_email: 'linkedinservice@linkedinmentor-381109.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDp/mudz8Qn1D31\nONsROOYDZ2umJr5PS6jdzUa2fyn29I7k4uvY6ApHXIvpd4F/VSSLCwg0MiQ3bE1u\nhtr9+SHU2jidOFIVfq88rH0/g+3PWs9+grAsDUBttp/E5jrOC6ne+y9CR/6j68CD\n7kpcuq7faXzVkrTZ6SDtiulfCExWmvOUFBfKA89OOeAskUdSUyIXnBcEHbVJIRHm\nmCjSWgxah3cyJGEVashAWhx0YhgJOFr8gjuFGw98TXcTtWSMmYq09IkKFvigJvxb\nyDS1/nXRkSR49zcoCHaVxPO2IijFJ058LkcJq393BPikZQuHffopjFaoR8uzVC6M\nKm2TVgQZAgMBAAECgf9UPHFV3oNlOrlfi3eTCpm4bvfc0Gd2i965Vwlsz4YjEi4d\nhDbbM5JJPwqGrUBLC7r+HLEQkR0hbyU1BDaFv7UO3bbFLtBIOO4z/If0J0u5QX1A\nEKCG5B2yW/6VMo4JN4u7808SxpFqbAS5Q38lGTWp9ojshXQ5HwLkdgqCdStSY4m9\nGTpV9MuSBl882x2LimSL+uWJknRC6oF9CK78P/YH4D5iKIVGn4GG2lr+eWqlOxLo\nv32ICiTk3s83++LVqWYSshAaUzJCFrdUq2WCGWFvNbjn0KXEz3Nf1x+9vw54vOvt\n0/TZ0CxDhTC/lwn8q8GChVeBW5asxs2JuHA3nkECgYEA9Y0FMPnrvcgY28gCPcYD\ngNxvMVj3NIWbLAs0X08CVz8g+UZRTCXDYcrW319cP9O0WKlshnwXF4clhhBQfV9m\nooMcB3bspgK8Hdpy62xn/p98pUH4awpt0H34kuVHXzrB+RKdyZnJX4BIza66YMsR\ngakDftJjVEcjviq+lMeKrRECgYEA8/OADnm1H2Xi4jYuQI0tjYs6Q3lTYoXbLbHg\n5q94TaNQki6OlU+maRYo0JURO8nOjEsgxblDSBPKLCnSqOoS9uEs+ClUZlSy1osT\n2YjPL/GVwsXb9QSLLM4Wd4zsMXT7Ecd2voOVZ1ojyFcsmh8SnHdBTG4WQ9qkIjOU\n/Q0BBokCgYEAqEgXELOWvh+N+cGe15sG958ajSU9db9C0vJy2AabwhM/k9Z/DMKs\nni6XB8qgvBVoeYLTH2+Xm8ZBDxnLL8Db4/Aam3sDP9qL9aGqNHG866F9mPwXNbSW\nAdbzLij3uunX2czKWkmM2mhefKeMj51byBJ+lMG21SFT+5XruqbuASECgYBzN7lu\nnMsPxkZPQvm7YTJ3nJ9rCN16NfBb95xaN9vhB1ZhhH2xRYo6Lc4fHZijHWBhYIZc\n/HArlbUyAJrPTqagVZ+woYyMPEqvC8bXQkdgxIBQGrUVVw0In1l7I2LWxQJj1kpe\nFrW0t50Y3Rtiu3RF1AlSONhpOdW1lZkznzWxyQKBgD4Ofc2C9aSS6l/TRoUmB6+N\ngxixrOUgMAOVGeeCikSl1YAHEoZhYMd1JJgjVdNsiddBsb/qbjLt1AdPqIpOIRxl\n2Xml3NpybY+BESwzfhjRHC/5OmcRJKXsKpt9HgtSS9CfYFvrdiFXbTMmRsz60ozG\nA0lXzhLxtzX/LBZQ9yWx\n-----END PRIVATE KEY-----\n',
  },
});
class MyDLPComponent extends React.Component {
    state = {
      results: null,
    };
  
    componentDidMount() {
      const request = {
        inspectConfig: {
          infoTypes: [{ name: 'PHONE_NUMBER' }],
        },
        item: {
          value: 'My phone number is 555-1234',
        },
      };
  
      dlpClient
        .inspectContent(request)
        .then((response) => {
          this.setState({ results: response.result });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    render() {
      const { results } = this.state;
  
      if (!results) {
        return <div>Loading...</div>;
      }
  
      return (
        <div>
          <h1>Results</h1>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      );
    }
  }
  export default MyDLPComponent;