import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from './Button';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space(4)};
  background: ${({ theme }) => theme.color.overlay};
  animation: ${fadeIn} ${({ theme }) => theme.transition.base};
`;

const Dialog = styled.div`
  width: 100%;
  max-width: 380px;
  padding: ${({ theme }) => theme.space(6)};
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${popIn} ${({ theme }) => theme.transition.base};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`;

const Description = styled.p`
  margin-top: ${({ theme }) => theme.space(2)};
  font-size: ${({ theme }) => theme.font.size.md};
  color: ${({ theme }) => theme.color.textMuted};
`;

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.space(5)};
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space(2)};
`;

export const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isConfirming = false,
  onConfirm,
  onCancel,
}: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <Overlay onClick={onCancel}>
      <Dialog role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <Actions>
          <Button variant="secondary" onClick={onCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? 'Deleting…' : confirmLabel}
          </Button>
        </Actions>
      </Dialog>
    </Overlay>
  );
};
