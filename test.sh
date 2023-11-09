RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
cd integration_test
cleanup () {
  docker-compose -p ci down
}
trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"' HUP INT QUIT PIPE TERM
docker-compose -p ci build && docker-compose -p ci up -d
if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed${NC}\n"
  exit -1
fi

TEST_EXIT_CODE=`docker wait ci-integration-tester-1`
docker logs ci-integration-tester-1
if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
  printf "${RED}Tests Failed${NC} - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed${NC}\n"
fi
cleanup
cd ..
exit $TEST_EXIT_CODE
