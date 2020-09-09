import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  CustomInput,
  Spinner,
  Table
} from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import {
  ReactTableWithPaginationCard,
  
} from '../../../containers/navs/ReactTableCards';


const Start = (  ) => {
  
  

  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <Colxx sm="12" xxl="12" lg="12" className="mb-4">
            <CardTitle>Exchange User List</CardTitle>
            <p>View list of all users with accounts on WLE portal</p>
          </Colxx>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Colxx sm="12" xxl="4" lg="4" className="mb-4">
              <FormGroup className="pl-0">
                <Input
                  type="text"
                  placeholder="Name/Email"
                  style={{ width: '50%' }}
                />
              </FormGroup>
            </Colxx>{' '}
            <Colxx sm="12" xxl="4" lg="4" className="mb-4">
              <FormGroup>
                <h6>
                  <strong>Filter Status</strong>
                </h6>
                <Input
                  addon
                  type="radio"
                  aria-label="Radio for following text input"
                />
                <Label sm={4} className="pt-0">
                  Blocked
                </Label>
                <Input
                  addon
                  type="radio"
                  aria-label="Radio for following text input"
                />
                <Label sm={4} className="pt-0">
                  Active
                </Label>
              </FormGroup>
            </Colxx>
            <Colxx sm="12" xxl="4" lg="4" className="mb-4">
              <Button color="warning" className="default mb-2">
                Search
              </Button>
              <Button color="dark" className="default mb-2 ml-2">
                Clear
              </Button>
            </Colxx>
          </Row>
          <Row>
          <Colxx xxs="12">
          <ReactTableWithPaginationCard />
        </Colxx>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
export default Start;
