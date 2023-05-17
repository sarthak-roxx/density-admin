import React, { memo } from 'react';
import { Button, Typography, Box, Modal, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { BUTTONWRAPPER, CONTIANER, PRIMARYBUTTON, SECONDARYBUTTON, SPACE_BETWEEN } from './Style';

const CustomModal = ({
	isOpen,
	ContainerSx,
	isSecondaryAction,
	TitleSx,
	isPrimaryAction,
	isClose,
	close,
	primaryName,
	primaryAction,
	secondaryName,
	secondaryAction,
	title,
	children,
	primaryDisabled,
}) => {
	return (
		<Modal open={isOpen} onClose={close}>
			<Container sx={ContainerSx || CONTIANER}>
				<Box sx={{ p: { xs: 1.2, md: 2 } }}>
					<Box sx={SPACE_BETWEEN}>
						<Typography component={'h1'} variant="Bold_24" sx={TitleSx || {}}>
							{title}
						</Typography>

						{isClose === true && (
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								<CloseIcon sx={{ color: '#000', cursor: 'pointer' }} onClick={close} />
							</Box>
						)}
					</Box>

					{children}
				</Box>
				{(isPrimaryAction || isSecondaryAction) && (
					<>
						<Box maxWidth="md" sx={BUTTONWRAPPER}>
							{isSecondaryAction && (
								<Button variant="main" sx={SECONDARYBUTTON} onClick={secondaryAction}>
									{secondaryName}
								</Button>
							)}

							{isPrimaryAction && (
								<Button
									disabled={primaryDisabled}
									variant="primary"
									type="submit"
									sx={PRIMARYBUTTON}
									onClick={primaryAction}
								>
									{primaryName}
								</Button>
							)}
						</Box>
					</>
				)}
			</Container>
		</Modal>
	);
};

CustomModal.propTypes = {
	isOpen: PropTypes.bool,
	close: PropTypes.func,
	primaryName: PropTypes.string,
	primaryAction: PropTypes.func,
	isClose: PropTypes.bool,
	isPrimaryAction: PropTypes.bool,
	isSecondaryAction: PropTypes.bool,
	secondaryName: PropTypes.string,
	secondaryAction: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.object,
	TitleSx: PropTypes.object,
	ContainerSx: PropTypes.object,
	primaryDisabled: PropTypes.bool,
};

export default memo(CustomModal);
