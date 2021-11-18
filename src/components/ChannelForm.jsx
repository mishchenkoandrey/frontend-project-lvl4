// @ts-check

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import validationSchemas from '../validation.js';

const ChannelForm = ({
  initialName,
  handleSubmit,
  closeModal,
}) => {
  const { channelFormSchema } = validationSchemas();
  const { t } = useTranslation();
  const inputRef = useRef();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const formik = useFormik({
    initialValues: {
      name: initialName,
    },
    validationSchema: channelFormSchema(channelsNames),
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.isSubmitting]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          value={formik.values.name}
          ref={inputRef}
          onFocus={(e) => e.currentTarget.select()}
          type="text"
          name="name"
          id="name"
          onChange={formik.handleChange}
          aria-label="add channel"
          className="mb-2 form-control"
          data-testid="add-channel"
          isInvalid={!formik.isValid}
          autoComplete="off"
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            disabled={formik.isSubmitting}
            onClick={closeModal}
            type="button"
            variant="secondary"
            className="me-2"
          >
            {t('cancel')}
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('send')}</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default ChannelForm;
