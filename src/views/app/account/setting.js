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
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import TwoFactorModal from './twofactor';
import {
  changePassword,
  getTwoFactor,
  changeTwoFactor,
} from '../../../redux/actions';
import { connect } from 'react-redux';
import { NotificationManager } from '../../../components/common/react-notifications';
import { PASSWORD_REGEX } from '../../../constants/defaultValues';

const Start = (props) => {
  const { match, error, loading, changePassSuccess,twofactorSuccess } = props;
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false);
  const [loadingAuth, setLoadingAuth] = React.useState(false);
  // const [loadingPass, setLoadingPass] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [newPassAgain, setNewPassAgain] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [isOpenTwoAuth, setIsOpenTwoAuth] = React.useState(false);
  const [errors, setError] = React.useState({
    oldPassword: '',
    newPassword: '',
    newPassAgain: '',
  });

  const handleAuth = (value) => {
    setLoadingAuth(true);
    setIsOpenTwoAuth(true);
  };

  const toggleIsAuth = () => {
    setIsOpenTwoAuth(!isOpenTwoAuth);
    setLoadingAuth(false);
  };

  const validate = () => {
    let val = false;
    setError({
      ...errors,
      oldPassword: '',
      newPassAgain: '',
      newPassword: '',
    });
    if (newPassAgain != newPassword) {
      setError({
        ...errors,
        newPassAgain: "Password doesn't match",
      });
      val = true;
    }
    if (!PASSWORD_REGEX.test(newPassword)) {
      setError({
        ...errors,
        newPassword: 'Not a strong password',
      });
      val = true;
    }
    if (oldPassword.length < 1) {
      setError({
        ...errors,
        oldPassword: 'Enter correct old password',
      });
      val = true;
    }
    return val;
  };

  const handlePassSubmit = () => {
    const { history } = props;
    if (validate()) {
      return;
    }
    props.changePasswordAction({
      oldPassword,
      newPassword,
      newPassAgain,
      history,
    });
  };

  React.useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Error', 3000, null, null, '');
    }
  }, [error]);
  React.useEffect(() => {
    if (changePassSuccess) {
      NotificationManager.warning(
        changePassSuccess,
        'Success',
        3000,
        null,
        null,
        ''
      );
    }
  }, [changePassSuccess]);

  React.useEffect(()=>{
    if (twofactorSuccess && isOpenTwoAuth) {
      NotificationManager.warning(
        twofactorSuccess,
        'Two Factor Authentication',
        3000,
        null,
        null,
        ''
      );
    }
    setIsOpenTwoAuth(false);
    setLoadingAuth(false);
  },[props.twoauth])

  React.useEffect(()=>{
    props.getTwoFactorAction(props.history);
  },[])

  return (
    <>
      <TwoFactorModal
        open={isOpenTwoAuth}
        toggle={toggleIsAuth}
        status={twoFactorAuth}
        {...props}
      />
     
      <Row>
        <Colxx  sm='12' xxl='7' lg='7'  className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Change Password</CardTitle>
              <Form>
                <FormGroup className="form-group has-top-label">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {errors.oldPassword.length > 0 && (
                    <div className="invalid-feedback d-block">
                      {errors.oldPassword}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-top-label">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {errors.newPassword.length > 0 && (
                    <div className="invalid-feedback d-block">
                      {errors.newPassword}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-top-label">
                  <Label>New Password Again</Label>
                  <Input
                    type="password"
                    value={newPassAgain}
                    onChange={(e) => setNewPassAgain(e.target.value)}
                  />
                  {errors.newPassAgain.length > 0 && (
                    <div className="invalid-feedback d-block">
                      {errors.newPassAgain}
                    </div>
                  )}
                </FormGroup>

                <Button
                  color="primary"
                  onClick={() => handlePassSubmit()}
                  disabled={loading}
                >
                  Save
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx  sm='12' xxl='5' lg='5' className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>Two Factor Authentication</CardTitle>
              {!loadingAuth ? (
                <Form>
                  <label>{props.twoauth==1 ? 'Disable' : 'Enable'}</label>
                  <FormGroup className="form-group has-top-label py-2">
                    <Switch
                      className="custom-switch custom-switch-primary"
                      checked={props.twoauth==1? true: false}
                      onChange={(primary) => handleAuth(primary)}
                    />
                  </FormGroup>
                  <label>
                    Two factor authentication is{' '}
                    {props.twoauth==1 ? 'enabled' : 'disbaled'}
                  </label>
                </Form>
              ) : (
                <div className="text-center py-5">
                  <Spinner size="sm" color="primary" />
                </div>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { loading, error, changePassSuccess, loading2F, qrCode,code, twoauth, twofactorSuccess } = authUser;
  return { loading, error, changePassSuccess, loading2F, qrCode,code, twoauth,twofactorSuccess };
};

export default connect(mapStateToProps, {
  changePasswordAction: changePassword,
  getTwoFactorAction: getTwoFactor,
  changeTwoFactorAction: changeTwoFactor,
})(Start);
