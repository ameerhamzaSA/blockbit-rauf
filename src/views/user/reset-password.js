import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
 import { resetPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';
import { PASSWORD_REGEX } from '../../constants/defaultValues';

const validateNewPassword = (values) => {
  const { newPassword, newPasswordAgain } = values;
  const errors = {};
  if (!PASSWORD_REGEX.test(newPassword)) {
    errors.newPassword =
      'Password should contains upper and lower case aphabets, symbols and numbers should be atleast 8 characters long';
  }
  if (newPasswordAgain && newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = 'Please check your new password';
  }
  return errors;
};

const ResetPassword = ({
  location,
  history,
  loading,
  error,
  resetPasswordAction,
  resetPasswordNew,
}) => {
  const [newPassword] = useState('');
  const [newPasswordAgain] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && resetPasswordNew === 'success')
      NotificationManager.success(
        'Please login with your new password.',
        'Reset Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, loading, resetPasswordNew]);

  const onResetPassword = (values) => {
    if (!loading) {
      const params = new URLSearchParams(location.search);
      const oobCode = params.get('token');
      if (oobCode) {
        if (values.newPassword !== '') {
          resetPasswordAction({
            newPassword: values.newPassword,
            resetPasswordCode: oobCode,
            history,
          });
        }
      } else {
        NotificationManager.warning(
          'Token is invalid try again.',
          'Reset Password Error',
          3000,
          null,
          null,
          ''
        );
      }
    }
  };

  const initialValues = { newPassword, newPasswordAgain };

  return (
    <Row className="h-100">
      <Colxx xxs="10" md="8" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
               RESET PASSWORD
            </CardTitle>

            <Formik
              validateOnChange={true}
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                       New Password
                    </Label>
                    <Field
                      className="form-control"
                      name="newPassword"
                      type="password"
                    />
                    {errors.newPassword && touched.newPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.newPassword}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                       Verify Password
                    </Label>
                    <Field
                      className="form-control"
                      name="newPasswordAgain"
                      type="password"
                    />
                    {errors.newPasswordAgain && touched.newPasswordAgain && (
                      <div className="invalid-feedback d-block">
                        {errors.newPasswordAgain}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                       Login
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                         RESET
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { resetPasswordNew, resetPasswordCode, loading, error } = authUser;
  return { resetPasswordNew, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
